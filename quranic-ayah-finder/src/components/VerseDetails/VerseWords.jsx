import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function VerseWords({verseByWords}) {
    // table of words in the given ayah/verse
    return (
        <>
        <h2>Words</h2>
        <div className="card mt-4">
            <DataTable value={verseByWords.words} paginator rows={6} tableStyle={{ minWidth: '50rem', fontSize: '14px' }}>
                <Column field="position" header="Position In verse"></Column>
                <Column field="text_uthmani" header="Arabic Text"></Column>
                <Column field="translation.text" header="Translation"></Column>
                <Column field="transliteration.text" header="Transliteration"></Column>
            </DataTable>
        </div>
        </>
    )
}