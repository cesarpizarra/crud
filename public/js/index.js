document.addEventListener('DOMContentLoaded', function () {
  // Cache alert elements
  const successElement = document.querySelector('#success');
  const warningElement = document.querySelector('#warning');
  // Alert messages
  const alerts = {
    showAlert: function (element, duration = 1500) {
      element.classList.add('d-block');
      setTimeout(() => {
        element.classList.remove('d-block');
      }, duration);
    },

    successAlert: function () {
      this.showAlert(successElement);
    },

    warningAlert: function () {
      this.showAlert(warningElement);
    },
  };

  // Create user
  const saveUser = document.getElementById('saveUser');
  saveUser.addEventListener('click', function () {
    const userForm = document.getElementById('userForm');
    const formData = new FormData(userForm);
    const data = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    if (data.username.trim() === '' || data.password.trim() === '') {
      return alerts.warningAlert();
    }
    // Make an AJAX request to save user data
    fetch('/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        $('#dataModal').modal('hide'); // Hide the modal
        $('#dataTable').bootstrapTable('refresh'); // Refresh the table if success added
        alerts.successAlert(); // Show the success alert
        userForm.reset();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });

  // Delete User
  document
    .getElementById('dataTable')
    .addEventListener('click', function (event) {
      if (event.target && event.target.matches('.btn-danger')) {
        const userId = event.target.getAttribute('data-id'); // Get user ID from data-id attribute
        if (confirm('Are you sure you want to delete this user?')) {
          fetch(`/delete/${userId}`, {
            // Adjust URL as necessary for your route
            method: 'DELETE',
          })
            .then((response) => {
              if (!response.ok) throw new Error('Network response was not ok.');
              return response.json();
            })
            .then(() => {
              console.log('Table Refreshd');
              $('#dataTable').bootstrapTable('refresh'); // Refresh the table after deletion
              alerts.successAlert(); // Show the success alert
            })
            .catch((error) => {
              console.error('Error:', error);
              alerts.warningAlert(); // Show warning alert if there's an error
            });
        }
      }
    });
  // Initialize the userId
  let currentUserId = null;

  // Fetch User Details and Show Modal
  document
    .getElementById('dataTable')
    .addEventListener('click', function (event) {
      if (event.target && event.target.matches('.btn-edit')) {
        const userId = event.target.getAttribute('data-id'); // Get user ID from data-id attribute

        // Fetch user details
        fetch(`/user/${userId}`)
          .then((response) => response.json())
          .then((user) => {
            currentUserId = user.id;
            document.getElementById('editUsername').value = user.username;
            document.getElementById('editPassword').value = user.password;
            $('#editModal').modal('show'); // Show the edit modal
          })
          .catch((error) => {
            console.error('Error:', error);
            alerts.warningAlert(); // Show warning alert if there's an error
          });
      }
    });

  // Update User
  const updateUser = document.getElementById('updateUser');
  updateUser.addEventListener('click', function () {
    const editForm = document.getElementById('editForm');
    const formData = new FormData(editForm);
    const data = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    if (data.username.trim() === '' || data.password.trim() === '') {
      return alerts.warningAlert();
    }

    // Make an AJAX request to update user data
    fetch(`/update/${currentUserId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((user) => {
        $('#editModal').modal('hide'); // Hide the edit modal
        $('#dataTable').bootstrapTable('refresh'); // Refresh the table if success added
        alerts.successAlert(); // Show the success alert
      })
      .catch((error) => {
        console.error('Error:', error);
        alerts.warningAlert(); // Show warning alert if there's an error
      });
  });
});
