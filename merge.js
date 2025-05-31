import PDFMerger from 'pdf-merger-js';

let merger = new PDFMerger();

export async function mergePdfs(...files) {
    for (const file of files) {
        await merger.add(file);
    }
    
    let d = new Date().getTime();


    // Set metadata
    // await merger.setMetadata({
    //     producer: "pdf-merger-js based script",
    //     author: "John Doe",
    //     creator: "John Doe",
    //     title: "My life as John Doe"
    // });

    await merger.save(`public/${d}.pdf`);
    return d;
}
