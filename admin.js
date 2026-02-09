// --- BEGIN FIREBASE CONFIGURATION ---
// Beginner Tip: You can get these keys by creating a free project at console.firebase.google.com
const firebaseConfig = {
    databaseURL: "https://your-project-id.firebaseio.com"
};
// --- END FIREBASE CONFIGURATION ---

window.onload = function () {
    console.log("Admin Panel Loaded");
    // For now, we show how it WOULD look with real data
    loadFromDatabase();
};

function loadFromDatabase() {
    console.log("Reading from Local Shared Database...");

    // Read from the shared "LocalStorage" which both pages can see if opened in same session
    const submissions = JSON.parse(localStorage.getItem('care_e_submissions') || '[]');

    const tableBody = document.getElementById('tableBody');

    if (submissions.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" style="text-align:center;">No submissions found. Fill the form on the landing page!</td></tr>';
        document.getElementById('totalCount').textContent = '0';
    } else {
        displaySubmissions(submissions);
    }
}

// Beginner trick: We check for new data every 3 seconds automatically
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
            '<td><button class="view-btn" onclick="viewDetails(\'' + submission.id + '\')">View Details</button></td>';

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

