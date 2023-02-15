//return the iser display name from session
export function UserDisplayName(req)  {
    if(req.user){
        return req.user.displayName;
    }
    return ''
}