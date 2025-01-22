const Page = async({ params }) => {
  const { id } = params
  console.log(id)
  return (
    <div>
      Hello World details!
    </div>
  )
}

export default Page;