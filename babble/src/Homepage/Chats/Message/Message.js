import './message.css'

function Message({content, reply, timeSent, attachedFile}) {

    const handleDownload = function () {
        if (attachedFile) {
            const url = URL.createObjectURL(attachedFile);

            const link = document.createElement('a');
            link.href = url;
            link.download = attachedFile.name;

            link.click();
            URL.revokeObjectURL(url);
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
                            <label className='file-name'> - {attachedFile.name}</label>
                        </button>
                    </>
                }
                <span className="time-sent">{timeSent}</span>
            </div>
        </div>
    );
}

export default Message;