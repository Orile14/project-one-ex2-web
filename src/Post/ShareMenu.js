const ShareMenu = () => {
    return(
    <div className="btn-group">
        <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <i className="bi bi-send"></i>
            &nbsp; Share
        </button>
        <ul className="dropdown-menu dropdown-menu-bottom">
            <li><a className="dropdown-item" href="#">share as post</a></li>
            <li><a className="dropdown-item" href="#">share to whatsApp</a></li>
            <li><a className="dropdown-item" href="#">Share to youre friends</a></li>
            <li><hr className="dropdown-divider"></hr></li>
            <li><a className="dropdown-item" href="#">add youre thoughts:
            </a></li>
        </ul>
    </div>
    );
};
export default ShareMenu;