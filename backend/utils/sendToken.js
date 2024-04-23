export const sendToken = (res,user,message,statuscocde=200)=>{

    const token = user.getJWTToken();

    const options = {
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: "none",
       
    }
        


    res.status(statuscocde).cookie('token',token,options).json({
        
        success: true,
        message,
        user : {
            name : user.name,
            email: user.email,
            _id : user._id,
        },
    })
}