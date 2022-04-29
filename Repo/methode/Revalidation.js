export default async function Revalidate(res, path) {
    try {
        await res.unstable_revalidate(path)
    } catch (err) {
        console.log(err)
    }
}