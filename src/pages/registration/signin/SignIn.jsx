import './SignIn.css';

function SignIn(){
    return (
        <>
            <form>
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
                    <label htmlFor='email'>Phone number</label>
                    <input type='email' placeholder='example@gmail.com' name='email' id='email' required />
                </section>
                <section>
                    <label htmlFor='password'>Phone number</label>
                    <input type='password' name='password' id='password' required />
                </section>
                <section>
                    <input type='submit' value='Create accaunt' />
                    <input type='reset' value='Deny' />
                </section>
            </form>
        </>
    )
}

export default SignIn;