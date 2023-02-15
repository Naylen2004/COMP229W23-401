//return the iser display name from session
export function UserDisplayName(req)  {
    if(req.user){
        return req.user.displayName;
    }
    return ''
}

// can add AuthGuard to any route you want to protect 
export function AuthGuard(req,res,next) {
    if(!req.isAuthenticated()){
        return res.redirect('/login')
    }
    next();
}