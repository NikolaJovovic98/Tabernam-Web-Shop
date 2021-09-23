const login_validator = (loginData) =>{
    return new Promise((resolve,reject)=>{
        try {
            const { email, password } = loginData;
            const errors = [];
            const reEmail = /\S+@\S+\.\S+/;

            if( email.length === 0 || password.length === 0 ) {
                errors.push("Must fill all fields");
            }

            if(!reEmail.test(email)){
                errors.push("Invalid email format");
            }

            if(password.length < 6) {
                errors.push("Password must be at least 6 char long");
            }

            resolve(errors);

        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
};

export default login_validator;