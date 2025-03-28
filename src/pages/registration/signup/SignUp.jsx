import './SignUp.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SignUp(){
    const [users, setUsers] = useState();
    const [user, setUser] = useState();
    const [confirm, setConfirm] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() =>{
        fetchUsers();
    }, [confirm]);

    async function fetchUsers(){
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/users`);
            if (!res.ok) throw new Error('Can not get default users? Huh');
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error('Can not get users:', error);
        }
    };

    async function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        data.sclass = parseFloat(data.sclass.slice(1));
        console.log(data)

        data.password = await hashPassword(data.password);
        if(data.fullname.replace(/\s+/g, '') !== data.fname + data.lname)
            setError(<p>First name and Last name do not match</p>);
        else if(users.find(user => user.email === data.email || user.phone === data.phone))
            setError(<p>This accaunt already exit, <Link to="sign-in">Sign In?</Link></p>);
        else{
            const unicode = generateUnicCode(data.sclass);
            setUser({ ...data, unicode });
            setConfirm(true);
            setError(null);
        } 
    }

    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    function generateUnicCode(userClass){
        const max = users.filter(val => val.sclass === userClass).reduce((maxUser, curUser) => maxUser.unicode > curUser.unicode ? maxUser : curUser, 0).unicode;
        return Number((max + 0.001).toFixed(5));
    }

    async function handleConfirm(){
        await fetchUsers();
        if(users.find(curUser => curUser.email === user.email || curUser.phone === user.phone))
            setError(<p>This accaunt already exit, <Link to="sign-in">Sign In?</Link></p>);
        else{
            setUsers(users => [...users, user]);
            setConfirm(false);
            setError(null);
            fetchFromBack();
        } 
    }

    async function fetchFromBack(){
        try{
            const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if(!res.ok) throw new Error('Can not add user');
            const result = await res.json();
            console.log(result.message);
        }catch(error){
            console.error('Error:', error);
        }
    }

    return (
        <>
            <form id='sign-up-form' onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <section>
                    <label htmlFor='fname'>First name</label>
                    <input type='text' placeholder='Aleko' name='fname' id='fname' required />
                </section>
                <section>
                    <label htmlFor='lname'>Last name</label>
                    <input type='text' placeholder='Elisashvili' name='lname' id='lname' required />
                </section>
                <section>
                    <label htmlFor='fullname'>Full name (must match first and last names)</label>
                    <input type='text' placeholder='Aleko Elisashvili' name='fullname' id='fullname' required />
                </section>
                <label>Your class</label>
                <span>
                    <input type='radio' name='sclass' id='s10' value='s10' required />
                    <label htmlFor='s10'>&lt;= 10 (remember, there is a lot to learn, you could get less than a 20%)</label>
                </span>
                <span>
                    <input type='radio' name='sclass' id='s11' value='s11' required />
                    <label htmlFor='s11'>11</label>
                </span>
                <span>
                    <input type='radio' name='sclass' id='s12' value='s12' required />
                    <label htmlFor='s12'>12</label>
                </span>
                <section>
                    <label htmlFor='phone'>Phone number</label>
                    <span>
                        <select>
                            <option>Geo(+995)</option>
                            <option disabled>No more :(</option>
                        </select>
                        <input type='tel' placeholder='5681*****' name='phone' id='phone' required />
                    </span>
                </section>
                <section>
                    <label htmlFor='email'>Email</label>
                    <input type='email' placeholder='example@gmail.com' name='email' id='email' required />
                </section>
                <section>
                    <label htmlFor='password'>Password (remember it!)</label>
                    <input type='password' name='password' id='password' required />
                </section>
                <section>
                    <input type='submit' value='Create accaunt' />
                    <input type='reset' value='Deny' />
                </section>
                {confirm && 
                <section>
                    <strong>Rememeber this unicode, without it it will be hard to sign in - {user.unicode}</strong>
                    <label>Confirm accaunt?</label>
                    <button type='button' onClick={handleConfirm}>Confirm</button>
                    <button type='button' onClick={() => setConfirm(false)}>Deny</button>
                </section>}
                {error}
            </form>
        </>
    )
}

export default SignUp;