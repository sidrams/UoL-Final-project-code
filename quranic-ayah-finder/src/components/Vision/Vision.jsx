import vision from '@google-cloud/vision'
import ayah from '../../images/surah fatiha ayah 1.png'

export const Vision = () => {
    const client = new vision.ImageAnnotatorClient({
        keyFilename: 'APIKey.json'
    })
    
    const detectText = () => {
        client.labelDetection(ayah)
            .then(results => {
                const labels = results[0].labelAnnotations

                console.log('Labels:')
                labels.forEach(label => console.log(label.description))
            })
            .catch(err => {
                console.error('ERROR:', err)
            })
    }

    return (
        <>
        <div>test</div>
        <img src={ayah} />
        {detectText}
        </>
    )
}