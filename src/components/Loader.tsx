export default function Loader() {
    return (
        <div className="flex flex-col justify-center items-center w-full max-w-7xl">
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                role="status">
            </div>
        </div>
    )
}