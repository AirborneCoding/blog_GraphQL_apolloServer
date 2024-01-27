
const ModalForDelete = ({ Modal, handleClose, action, username }) => {
    return <div className={`fixed inset-0 z-50 ${Modal ? '' : 'hidden'}`}>
        <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-60">
            <div className="form-father">
                <p className='text-xl text-black'>Hello {username}, Are you sure you want to delete your account ?</p>
                <div className="btn-container mt-8">
                    <button
                        className="btn-nc bg-red-500"
                        onClick={action}
                    >Delete</button>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="ml-4 text-gray-500 hover:text-gray-700 font-semibold"
                    >Cancel</button>
                </div>
            </div>
        </div>
    </div>
};

export default ModalForDelete;

