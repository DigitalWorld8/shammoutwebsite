
import React from 'react';

export const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="flex flex-col items-center">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/ef55696ff67ea3de1f900af9552cd47587ba243e"
                    alt="Shammout Group Logo"
                    className="w-[167px] animate-pulse"
                />
                <div className="mt-4">
                    <div className="h-1 w-32 overflow-hidden bg-gray-200 rounded-full">
                        <div className="h-full w-full bg-[rgba(204,31,65,1)] animate-[slide-in-right_1.5s_ease-in-out_infinite]" />
                    </div>
                </div>
            </div>
        </div>
    );
};
