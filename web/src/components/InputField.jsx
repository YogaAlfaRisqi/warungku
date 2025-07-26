export default function InputField({
  title = ' ',
  subtitle = '',
  buttonText = '',
  onSubmit = () => {},
  children,
}) {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(e)
        }}
      >
        {children}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          {buttonText}
        </button>
      </form>
    </div>
  )
}
