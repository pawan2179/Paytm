import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/v1';

const Signup = () => {
    return(
    <PopupRoot>
        <UserInfoComponent/>
    </PopupRoot>)
}

export const PopupRoot = ({children}) => {
    return (
        <div className='h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-70'>
            {children}
        </div>
    )
}

export const Signin = () => {
    let userMail = "";
    let userPassword = "";

    const signinMail = (event) => {
        userMail = event.target.value
    }
    const signinPassword = (event) => {
        userPassword = event.target.value
    }

    const signInUser = () => {

        console.log('onclick -> ', userMail, userPassword);
        const body = {
            userName: userMail,
            password: userPassword
        }

        try {
            axios({
                method: 'POST',
                url: baseUrl+'/signin',
                data: body,
                headers: {"Content-Type": "application/json"}
            }).then((response) => {
                if(response.status == 200) {
                    console.log(response.data);
                    localStorage.setItem('paytm-user-id', response.data.id);
                    alert('Sign in successfull');
                }
                else {
                    console.log('Invalid username/password')
                }
            }).catch((response) => { console.log('Something went wrong')})
        } catch(error) {
            console.log('API call failed')
        }
    }

    return (
        <PopupRoot>
            <div className= "flex flex-col bg-white border-blue-950 border-2 py-4 px-16 rounded-lg">
                <div className="flex flex-wrap">
                    <span className="text-3xl py-8 font-bold select-none">Welcome to</span><span className="text-3xl py-8 font-bold text-blue-950 pl-2 select-none"> Pay</span><span className="text-3xl py-8 font-bold text-cyan-500 select-none">tm</span>
                </div>
                <LoginInputComponent updateEmail={signinMail} updatePassword={signinPassword}  />
                <CtaButton btnText={'Sign In'} submitFunction={signInUser} />
                <span className='text-cyan-500 text-center'>Don't have account already? Signup</span>
            </div>
        </PopupRoot>
    )
}

const UserInfoComponent = () => {
    let firstName = '';
    let lastName = '';
    let email = '';
    let password = '';

    const createUser = () => {
        console.log(firstName, lastName, email, password);
        const body = {
            userName: email,
            password: password,
            firstName,
            lastName
        }
        try {
            axios({
                method: 'POST',
                url: baseUrl+'/signup',
                data: body,
                headers: {"Content-Type": "application/json"}
            }).then((response) => {
                console.log('Response status : ', response.status)
                if(response.status == 200) {
                    alert('Success');
                    console.log(response);
                    localStorage.setItem('paytm-user-id', response.data.token);
                }
                else {
                    alert('Signup attemp failed.');
                }
            }).catch((response) => {
                alert('Signup failed : ');
            })
        } catch(error) {
            alert('Something went wrong');
        }
    }

    const updateFirstName = (event) => {
        firstName = event.target.value;
    }
    const updateLastName = (event) => {
        lastName = event.target.value;
    }
    const updateEmail = (event) => {
        email = event.target.value;
    }
    const updatePassword = (event) => {
        password = event.target.value;
    }

    return (
    <div className= "flex flex-col border-blue-950 border-2 py-4 px-16 rounded-lg bg-white">
        <div className="flex flex-wrap">
            <span className="text-3xl py-8 font-bold">Welcome to</span><span className="text-3xl py-8 font-bold text-blue-950 pl-2"> Pay</span><span className="text-3xl py-8 font-bold text-cyan-500">tm</span>
        </div>
        <InputComp placeholder='Enter First name' type='text' updateFunction = {updateFirstName}/>
        <InputComp placeholder='Enter Last name' type='text' updateFunction = {updateLastName}/>
        <LoginInputComponent updateEmail = {updateEmail} updatePassword = {updatePassword} />
        <CtaButton btnText={'Sign Up'} submitFunction = {createUser}/>
        <span className='text-cyan-500 text-center'>Already have an account? Sign in</span>
    </div>)
}

export const InputComp = ({placeholder, type, updateFunction}) => {
    let isPasswordVisible = false;
    return (
        <div className="flex justify-center items-center h-12 my-4 border-solid border-blue-950 border-2 rounded-md p-1 select-none">
            <input type={type} placeholder={placeholder} className="w-full h-full outline-none" onChange={updateFunction}/>
            {/* <div onClick={() => { console.log('clicking the eye', isPasswordVisible); isPasswordVisible = !isPasswordVisible}}>
                {(type == 'password') ? {} ? <i class="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i> : <div></div>}
            </div> */}
        </div>
    )
}

export const LoginInputComponent = ({updateEmail, updatePassword}) => {
    return (
        <>
            <InputComp placeholder='Enter email id' type='email' updateFunction={updateEmail} />
            <div>
                <InputComp placeholder='Enter password' type='password' updateFunction={updatePassword}/>
            </div>
        </>
    )
}

export const CtaButton = ({btnText, submitFunction}) => {
    return (
        <>
            <button className="bg-blue-950 text-white text-xl my-4 py-4 px-8 rounded-lg" onClick={submitFunction}>{btnText}</button>
        </>
        
    )
}

export default Signup