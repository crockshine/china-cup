export default function MessageList({ text, currentUserID }) {
    console.log(text, ' in msgList');

    return (
        <div className="Message-list flex flex-col">
            {
                text.map((item, index) => (
                    <div
                        key={index} // Добавляем уникальный ключ для каждого элемента
                        className={`w-full flex p-5 ${(item.bySend == currentUserID) ? "justify-end text-end" : "justify-start text-start"}`}
                    >
                        <div
                            className={`InMsg w-fit h-fit max-w-sm p-5 ${(item.bySend == currentUserID) ? "bg-white" : "bg-sky-100"} right-2 font-bold text-slate-500 rounded-2xl`}
                        >
                            {item.textInOneMsg} {/* Убедитесь, что это строка */}
                        </div>
                    </div>
                ))
            }
        </div>
    );
}