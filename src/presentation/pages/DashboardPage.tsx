export const DashboardPage = ({ messages }: { messages: string[] }) => {
    return (
        <div className="w-full max-w-3xl mx-auto">

            {messages.length === 0 ? (
                <div className="text-gray-500 dark:text-gray-400 mt-50 text-xl text-center">
                    Tôi có thể giúp gì bạn?
                </div>
            ) : (
                <div className=" space-y-2">
                    {messages.map((msg, idx) => (
                        <div key={idx} className="w-full flex justify-end">
                            <div className="bg-gray-100 dark:bg-gray-800 py-2.5 px-5 rounded-3xl break-words whitespace-pre-wrap inline-block max-w-[80%]">
                                {msg}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
