
export const userSignUp= async (req,res)=>{
    try{
    const { name, email, password } = req.body
    console.log(name, email, password, 'jej', typeof name);
    if(!name || !email || !password){
      return res.status(400).json({result:"provided information is not correct"})
    }
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
      [name, email, password]
    );
    console.log(result, 'result of post method');
    res.status(200).json({result:"account created successfully"})
  } catch (error) {
    res.status(500).json({error,result:"Internal Server Error"})
    console.log(error, 'Error in post method');
  }

}

export const userSignIn = async (req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({error:'Internal Server Error'})
    }
}