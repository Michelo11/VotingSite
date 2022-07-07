$("#form").submit(function(e) {
    e.preventDefault();

    const username = $("#username").val();
    const password = $("#password").val();
    const confirmPassword = $("#confirmPassword").val();

    if (username === "" || password === "" || confirmPassword === "") {
        alert("Please fill all fields");
        return;
    }

    axios.post("http://localhost:3000/register", {
        username: username,
        password: password,
        confirmPassword: confirmPassword
    }).catch(error => {
        alert(error.response.data.message)
    })
})