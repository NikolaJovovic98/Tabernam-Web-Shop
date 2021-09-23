const validator = (formData) =>{
    return new Promise((resolve,reject)=>{
        try {
            const { username, email, password, confirmPassword } = formData;
            const errors = [];
            const reEmail = /\S+@\S+\.\S+/;
            if( 
                username.length === 0 ||
                email.length === 0 || 
                password.length === 0 ||
                confirmPassword.length === 0
             ) {
                errors.push("All fields must be filled");
             }

             if( password !== confirmPassword ) {
                 errors.push("Passwords don't match");
             }

             if( password.length < 6 ) {
                 errors.push("Password must be min of length 6");
             }

             if(!reEmail.test(email)) {
                 errors.push("Invalid email format");
             }

             resolve(errors);

        } catch (error) {
            console.log("Error in register validation");
            reject(false);
        }
    });
};

export default validator;