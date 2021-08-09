import DOMPurify from 'dompurify'

const SafeSummary = ({ label }: { label: string }) => {
    return <summary dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(label) }} />
}

export default SafeSummary
