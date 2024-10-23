"use client"

import React from "react"
import ChatBot from "./ChatBot";
import UploadFile from "./UploadFile";

export default function TrainPage() {
    return (
        <div className="flex w-full gap-5">
            <div className="w-1/2"><UploadFile /></div>
            <div className="w-1/2"><ChatBot /></div>
        </div>
    );
}