export const UserPfp = (
    {pfpUrl, nickname, className}: {pfpUrl: string, nickname: string, className?: string}
) => {
    return <img className={className} referrerPolicy="no-referrer" src={pfpUrl} alt={nickname}/>
}