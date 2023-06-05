import './message.css'
import {getFile} from "../../../DataAccess/chats";

function Message({id ,content, reply, timeSent, attachedFile}) {

    const handleDownload = async function () {
        if (attachedFile) {

            const file = await getFile(id);
            if(file === 'error') {
                alert("An error occurred downloading your file from the server.");
                return;
            }
            const fileData = file.data;

            const link = document.createElement('a');
            link.href = fileData;
            link.download = attachedFile;

            link.click();
        }
    };

    return (
        <div className={`message ${reply ? "reply-message" : "sender-message"}`}>
            <div>
                {content}
                {attachedFile !== null &&
                    <>
                    {content && (<hr></hr>)}
                        <button
                            id="downloadButton"
                            onClick={handleDownload}>
                            Download Attached File
                            <label className='file-name'> - {attachedFile}</label>
                        </button>
                    </>
                }
                <span className="time-sent">{timeSent}</span>
            </div>
        </div>
    );
}

export default Message;