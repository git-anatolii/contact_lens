"use client"

import Image from 'next/image';
import { Source_Sans_3 } from 'next/font/google'

const roboto = Source_Sans_3({
    weight: ['400', '700'],
    style: ['italic'],
    subsets: ['latin'],
    display: 'swap',
});

export default function Logo({ textSize }: { textSize: string }) {
    return (
        <div className="flex w-full items-center justify-center bg-gray-100 p-6 rounded-lg shadow-lg">
            <div className={`${roboto.className} flex justify-center items-center`}>
                <Image
                    src="/assets/images/logo.png"
                    alt="logo"
                    width={200}
                    height={150}
                    className="object-contain w-full"
                    priority
                />
            </div>
        </div>
    );
}