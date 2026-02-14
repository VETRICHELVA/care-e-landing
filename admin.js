const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "care-e-admin.firebaseapp.com",
    databaseURL: "https://care-e-admin-default-rtdb.firebaseio.com",
    projectId: "care-e-admin",
    storageBucket: "care-e-admin.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

window.onload = function () {
    console.log("Admin Panel Loaded");
    loadFromDatabase();
};

function loadFromDatabase() {
    console.log("Reading from Firebase Database...");
    
    database.ref('submissions').on('value', (snapshot) => {
        const submissions = [];
        snapshot.forEach((childSnapshot) => {
            submissions.push(childSnapshot.val());
        });
        
        const tableBody = document.getElementById('tableBody');
        
        if (submissions.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="8" style="text-align:center;">No submissions found. Fill the form on the landing page!</td></tr>';
            document.getElementById('totalCount').textContent = '0';
        } else {
            displaySubmissions(submissions);
        }
    });
}

setInterval(loadFromDatabase, 3000);

function displaySubmissions(submissions) {
    const tableBody = document.getElementById('tableBody');
    const totalCount = document.getElementById('totalCount');

    totalCount.textContent = submissions.length;
    tableBody.innerHTML = '';

    submissions.forEach(function (submission) {
        const row = document.createElement('tr');
        row.innerHTML =
            '<td>' + submission.id + '</td>' +
            '<td>' + submission.organizationName + '</td>' +
            '<td>' + submission.facilityType + '</td>' +
            '<td>' + submission.contactPerson + '</td>' +
            '<td>' + submission.email + '</td>' +
            '<td>' + submission.phone + '</td>' +
            '<td>' + submission.dateSubmitted + '</td>' +
            '<td>' +
            '<button class="view-btn" onclick="viewDetails(\'' + submission.id + '\')">View Details</button>' +
            '<button class="delete-btn" onclick="deleteSubmission(\'' + submission.id + '\')">Delete</button>' +
            '</td>';

        tableBody.appendChild(row);

        const detailsRow = document.createElement('tr');
        detailsRow.innerHTML =
            '<td colspan="8">' +
            '<div class="details" id="details-content-' + submission.id + '">' +
            '<h3>Full Details for ' + submission.organizationName + '</h3>' +
            '<p><strong>ID:</strong> ' + submission.id + '</p>' +
            '<p><strong>Address:</strong> ' + submission.address + '</p>' +
            '<p><strong>Service Needs:</strong> ' + submission.serviceNeeds + '</p>' +
            '</div>' +
            '</td>';
        tableBody.appendChild(detailsRow);
    });
}

function viewDetails(id) {
    const div = document.getElementById('details-content-' + id);
    div.style.display = (div.style.display === 'block') ? 'none' : 'block';
}

function deleteSubmission(id) {
    if (confirm("Are you sure you want to delete this submission?")) {
        database.ref('submissions').child(id).remove()
            .then(() => {
                alert("Submission deleted successfully.");
                loadFromDatabase();
            })
            .catch((error) => {
                alert("Error deleting submission: " + error.message);
            });
    }
}

