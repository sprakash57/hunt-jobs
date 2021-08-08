

const JobList = () => {
    return (
        <section>
            <form>
                <label htmlFor="location" aria-hidden={true} />
                <label htmlFor="technology" aria-hidden={true} />
                <input type="text" id="technology" placeholder="Find your dream job now" />
            </form>
        </section>
    )
}

export default JobList
