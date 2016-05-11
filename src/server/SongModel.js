"use strict";

const mongoose = require("mongoose"),
    instrumentSchema = new mongoose.Schema({
                id: Number,
                member: String,
                type: String
            }),
    blocksSchema = new mongoose.Schema({
                            id: Number,
                            isChecked: {type:Boolean, default: false}
                        }),
    rowsSchema = new mongoose.Schema({
                        chord: String,
                        blocks: [blocksSchema]
                    }),
    measuresSchema = new mongoose.Schema({
                    id: Number,
                    rows: [rowsSchema]
                }),
    sectionsSchema = new mongoose.Schema({
                name: String,
                bpm: Number,
                timeSig: Number,
                sectionColor: String,
                measures: [measuresSchema]
            }),
    songSchema = new mongoose.Schema({
            title: {type: String, required: true },
            instruments: [instrumentSchema],
            sections: [sectionsSchema]
        },
        {
            timestamps: true //get createdAt, updatedAt fields
        });

module.exports = mongoose.model("Song", songSchema);