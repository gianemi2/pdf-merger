#!/usr/bin/env node

import PDFMerger from 'pdf-merger-js';
import {
    PdfReader
} from "pdfreader";

let docs = [
    "24237",
    "24236",
    "24235",
    "24234",
    "24233",
    "24232",
    "24231",
    "24230",
    "24229",
    "24228",
    "24227",
    "24226",
    "24225",
    "24224",
    "24223",
    "24222",
    "24221",
    "24220",
    "24219",
    "24218",
    "24217",
    "24216",
    "24215",
    "24214",
    "24213",
    "24212",
    "24211",
    "24210",
    "24209",
    "24208",
    "24207",
    "24206",
    "24205",
    "24204",
    "24203",
    "24202",
    "24201",
    "24200",
    "24199",
    "24198",
    "24197",
    "24196",
    "24195",
    "24194",
    "24193",
    "24192",
    "24191",
    "24190",
    "24189",
    "24188",
    "24187",
    "24186",
    "24185",
    "24184",
    "24183",
    "24182",
    "24181",
    "24180",
    "24179",
    "24178",
    "24177",
    "24176",
    "24175",
    "24174",
    "24173",
    "24172",
    "24171",
    "24170",
    "24169",
    "24168",
    "24167",
    "24166",
    "24165",
    "24164",
    "24163",
    "24162",
    "24161",
    "24160",
    "24159",
    "24158",
    "24157",
    "24156",
    "24155",
    "24154",
    "24153",
    "24152",
    "24151",
    "24150",
    "24149",
    "24148",
    "24147",
    "24146",
    "24145",
    "24144",
    "24143",
    "24142",
    "24141",
    "24140",
    "24139",
    "24138",
    "24137",
    "24136",
    "24135",
    "24134",
    "24133",
    "24132",
    "24131",
    "24130",
    "24129",
    "24128",
    "24127",
    "24126",
    "24125",
    "24124",
    "24123",
    "24122",
    "24121",
    "24120",
    "24119",
    "24118",
    "24117",
    "24116",
    "24115",
    "24114",
    "24113",
    "24112",
    "24111",
    "24110",
    "24109",
    "24108",
    "24107",
    "24106",
    "24105",
    "24104",
    "24103",
    "24102",
    "24101",
    "24100",
    "24099",
    "24098",
    "24097"
]

const findOccurrencesInPdf = async (doc) => new Promise((resolve, reject) => {
    let page = 1;
    let references = [];
    new PdfReader().parseFileItems(doc, (err, item) => {
        if (err) reject("error:", err);
        if (!item) {
            resolve(references);
            return;
        }
        if (item.page) {
            page = item.page;
        }
        if (item.text) {
            const reference = docs.find((doc) =>
                item.text.includes(doc) ?
                true :
                false
            );
            if (reference) {
                references.push({
                    page: page,
                    code: reference
                })
            }

        }

    });
})

const mergeOccurrences = async () => {
    const references = {
        a: await findOccurrencesInPdf('doca.pdf'),
        b: await findOccurrencesInPdf('docb.pdf')
    }
    let mergedReferences = references.a.map(aItem => {
        const occ = references.b.find(bItem => (
            bItem.code === aItem.code ? true : false
        ))
        return {
            code: aItem.code,
            pageA: aItem.page,
            pageB: occ.page
        }
    })
    mergedReferences.forEach(async (ref) => {
        const merger = new PDFMerger();
        await merger.add('doca.pdf', ref.pageA)
        await merger.add('docb.pdf', ref.pageB)
        await merger.save(`${ref.code}.pdf`)
        await merger.reset();
    })
}

mergeOccurrences()