document.addEventListener('DOMContentLoaded', function() {
    populateUserList();
    populateBannedUserList();
    document.getElementById('deleteForm').addEventListener('submit', function(e) {
        e.preventDefault();
        let username = document.getElementById('deleteUsername').value.trim();
        let reason = document.getElementById('deleteReason').value.trim();
        banUser(username, reason);
    });
});

function populateUserList() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let userList = document.getElementById('userList').getElementsByTagName('tbody')[0];
    userList.innerHTML = ''; // Clear previous data
    users.forEach(user => {
        if (!user.banned) {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.password}</td>
                <td>${user.coins}</td>
                <td><button onclick="showBanReasonPrompt('${user.username}')">Ban</button></td>
            `;
            userList.appendChild(row);
        }
    });
}

function showBanReasonPrompt(username) {
    let reason = prompt(`Enter a ban reason for ${username}:`);
    if (reason) {
        banUser(username, reason);
    }
}

function banUser(username, reason) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let index = users.findIndex(user => user.username === username);
    if (index !== -1) {
        users[index].banned = true; // Mark the user as banned
        users[index].reason = reason; // Set the ban reason for the user
        localStorage.setItem('users', JSON.stringify(users)); // Update users array in localStorage
        alert(`User banned: ${username}\nReason: ${reason}`);
        populateUserList(); // Update the user list in the dashboard
        populateBannedUserList(); // Update the banned user list in the dashboard
    } else {
        alert('User not found');
    }
}

function unbanUser(username) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let index = users.findIndex(user => user.username === username);
    if (index !== -1) {
        users[index].banned = false; // Unmark the user as banned
        users[index].reason = ''; // Clear the ban reason for the user
        localStorage.setItem('users', JSON.stringify(users)); // Update users array in localStorage
        alert(`User unbanned: ${username}`);
        populateUserList(); // Update the user list in the dashboard
        populateBannedUserList(); // Update the banned user list in the dashboard
    } else {
        alert('User not found');
    }
}

function populateBannedUserList() {
    let bannedUserTable = document.getElementById('bannedUserList').getElementsByTagName('tbody')[0];
    bannedUserTable.innerHTML = ''; // Clear previous data
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach(user => {
        if (user.banned) {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.reason}</td>
                <td><button onclick="unbanUser('${user.username}')">Unban</button></td>
            `;
            bannedUserTable.appendChild(row);
        }
    });
}