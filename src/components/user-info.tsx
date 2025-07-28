import './user-info.css'

export default function UserInfo({userName, imgUrl}:{userName: string, imgUrl: string}) {

  return (
    <div className="user-info">
      <p>
        {userName || "No id"}
      </p>
      <img src={imgUrl} />
    </div>
  );
}
