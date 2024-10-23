import { useEffect, useState } from 'react';

export default function StatusButton({ status }: { status: string }) {
    const [buttonColor, setButtonColor] = useState<string>("");

    const buttonColors = [
        { buttonstatus: "store", color: "bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600" },
        { buttonstatus: "list", color: "bg-orange-500 hover:bg-orange-400 focus-visible:outline-orange-500" },
        { buttonstatus: "order", color: "bg-green-600 hover:bg-green-500 focus-visible:outline-green-600" },
    ];
    
    useEffect(() => {
        // Iterate through buttonColors array to find matching status
        buttonColors.forEach(buttoncolor => {
            if (buttoncolor.buttonstatus === status) {
                setButtonColor(buttoncolor.color);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    return (
        <button
            className={`flex h-10 w-16 items-center rounded-lg text-sm font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${buttonColor}`}
        >
            <span className="hidden md:block mx-auto">{status.toUpperCase()}</span>
        </button>
    );
}
