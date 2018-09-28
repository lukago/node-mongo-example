import {Document, Model, model, Schema} from 'mongoose';

export enum Category {
    IT, FoodAndDrinks, Office, Courier, ShopAssistant
}

export interface IJobPosting extends Document {
    id: string
    title: string;
    category: Category;
    dateStart: Date;
    dateEnd: Date;
    companyName: string;
}

export interface IJobPostingModel {
    addJobPosting(jobPosting: IJobPosting, callback: Function): void;

    findById(id: string, callback: Function): void;
}

const jobPostingSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: Category,
        required: true
    },
    dateStart: {
        type: Date
    },
    dateEnd: {
        type: Date
    },
    companyName: {
        type: String
    }
});

jobPostingSchema.static('addJobPosting', (posting, callback) => {
    posting.save(callback);
});

jobPostingSchema.static('findById', (id, callback) => {
    JobPosting.findOne({id: id}, callback);
});

export type JobPostingModel = Model<IJobPosting> & IJobPostingModel & IJobPosting;

export const JobPosting: JobPostingModel = <JobPostingModel>model<IJobPosting>('JobPosting', jobPostingSchema);
