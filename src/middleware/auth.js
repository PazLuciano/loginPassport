const authMdw = (req, res, next) => {
  
  if (req.session?.user) {
    // console.log("REVISANDO LA SESION**", req.session.user);
    return next();
    }
  
    return res.redirect("/login");
  };


const roleAuth = (req, res, next) => {
  console.log("revisandoo!", req.session.user);
  console.log("middleware", req.session.user);
  // const mail = req.sesion.user.mail || req.session.user._doc.mail 
  // console.log(mail);
  // if(mail.includes("@adminprueba.com")){
  //   // console.log("entra?");
  //   const user = req.session.user._doc;
  //   console.log(user);
  //   return res.render("adminPagemain", {user})
  // }
    next()
} 

  
module.exports = {authMdw, roleAuth}