import Image from "next/image";
import { IMetadata } from "@/app/types/metadata.type"

interface Props {
    metadata: IMetadata
    isLogin?: boolean
}

export default function NFTCard({ metadata, isLogin = false }: Props) {
    const { name, description, image_url } = metadata;

    return (
        <div className="max-w-[200px] justify-self-center text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Image
                className="rounded-t-lg"
                src={image_url}
                width={200}
                height={200}
                alt={name}
            />
            <div className="px-3 py-2">
                <a href="#">
                    <p className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">{name}</p>
                </a>
                <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">{description}</p>
                {isLogin && <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Mint
                </a>}
            </div>
        </div>

    )
}