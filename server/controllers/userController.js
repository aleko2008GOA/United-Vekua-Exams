import supabase from '../services/supabaseClient.js';

async function getUsers(req, res){
    try{
        const { data, error } = await supabase
            .from('users')
            .select('*');
        if(error) throw error;
        res.json(data);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
};

async function addUser(req, res) {
    try{
        const newUser = req.body;
        const sclass = newUser.sclass || 12;
    
        const { data, error } = await supabase
            .from('users')
            .insert([{ ...newUser, sclass }]);
    
        if(error) throw error;
        res.json({ message: 'User added successfully!', user: data });
    }catch (error){
        res.status(500).json({ error: error.message });
    }
};

export { getUsers, addUser };