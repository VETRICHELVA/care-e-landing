// Load submissions when page loads
window.onload = function() {
    loadSubmissions();
};

function loadSubmissions() {
    // In a real application, this would fetch from a server
    // For now, we'll use sample data
    const submissions = [
        {
            id: "ORG001",
            organizationName: "City General Hospital",
            facilityType: "Hospital",
            contactPerson: "Dr. John Smith",
            email: "john.smith@cityhospital.com",
            phone: "+91 98765 43210",
            address: "123 Main Street, Chennai",
            serviceNeeds: "Blood Products, Vaccines",
            dateSubmitted: "2026-02-08"
        },
        {
            id: "ORG002",
            organizationName: "LifeCare Clinic",
            facilityType: "Clinic",
            contactPerson: "Dr. Sarah Johnson",
            email: "sarah@lifecareclinic.com",
            phone: "+91 98765 43211",
            address: "456 Park Avenue, Mumbai",
            serviceNeeds: "Emergency Medications",
            dateSubmitted: "2026-02-07"
        },
        {
            id: "ORG003",
            organizationName: "Central Blood Bank",
            facilityType: "Blood Bank",
            contactPerson: "Mr. Rajesh Kumar",
            email: "rajesh@centralbloodbank.org",
            phone: "+91 98765 43212",
            address: "789 Hospital Road, Bangalore",
            serviceNeeds: "Blood Products, Plasma",
            dateSubmitted: "2026-02-06"
        },
        {
            id: "ORG004",
            organizationName: "MediLab Diagnostics",
            facilityType: "Diagnostic Lab",
            contactPerson: "Ms. Priya Patel",
            email: "priya@medilab.com",
            phone: "+91 98765 43213",
            address: "321 Science Park, Hyderabad",
            serviceNeeds: "Lab Samples, Vaccines",
            dateSubmitted: "2026-02-05"
        },
        {
            id: "ORG005",
            organizationName: "Apollo Regional Hospital",
            facilityType: "Hospital",
            contactPerson: "Dr. Amit Sharma",
            email: "amit.sharma@apollo.com",
            phone: "+91 98765 43214",
            address: "555 Health Street, Delhi",
            serviceNeeds: "All Services",
            dateSubmitted: "2026-02-04"
        }
    ];

    displaySubmissions(submissions);
}

function displaySubmissions(submissions) {
    const tableBody = document.getElementById('tableBody');
    const totalCount = document.getElementById('totalCount');
    
    totalCount.textContent = submissions.length;
    
    tableBody.innerHTML = '';
    
    submissions.forEach(function(submission) {
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
        
        // Add hidden details row
        const detailsRow = document.createElement('tr');
        detailsRow.id = 'details-' + submission.id;
        detailsRow.innerHTML = 
            '<td colspan="8">' +
            '<div class="details" id="details-content-' + submission.id + '">' +
            '<h3>Full Details for ' + submission.organizationName + ' (ID: ' + submission.id + ')</h3>' +
            '<p><strong>Address:</strong> ' + submission.address + '</p>' +
            '<p><strong>Service Requirements:</strong> ' + submission.serviceNeeds + '</p>' +
            '<p><strong>Contact Person:</strong> ' + submission.contactPerson + '</p>' +
            '<p><strong>Email:</strong> ' + submission.email + '</p>' +
            '<p><strong>Phone:</strong> ' + submission.phone + '</p>' +
            '<p><strong>Submitted On:</strong> ' + submission.dateSubmitted + '</p>' +
            '</div>' +
            '</td>';
        
        tableBody.appendChild(detailsRow);
    });
}

function viewDetails(id) {
    const detailsDiv = document.getElementById('details-content-' + id);
    
    if (detailsDiv.style.display === 'block') {
        detailsDiv.style.display = 'none';
    } else {
        // Hide all other details first
        const allDetails = document.querySelectorAll('.details');
        allDetails.forEach(function(detail) {
            detail.style.display = 'none';
        });
        
        // Show this one
        detailsDiv.style.display = 'block';
    }
}
