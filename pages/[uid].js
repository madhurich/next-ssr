function UserIdPage(props) {
    return (
        <h1>{props.userId}</h1>
    )
}

export default UserIdPage

export async function getServerSideProps(context) {
    const { params } = context
    console.log(params.uid)
    return {
        props: {
            userId: 'hello' + params.uid
        }
    }
}