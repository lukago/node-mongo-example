import {Request, Response, Router} from 'express';

import {Category, IJobPosting, JobPosting} from '../../models/jobPosting';
import {BaseRoute} from '../baseRoute';

export class JobPostingsRoute extends BaseRoute {

    public addJobPostingAction(router: Router): void {
        router.post('/postings', (req: Request, res: Response) => {
            const posting = new JobPosting(req.body as IJobPosting);
            console.log(posting);

            if (posting.dateStart.getTime() - posting.dateEnd.getTime() > 0) {
                this.setResponse(res, 'date conflict', 400);
            } else if (!(posting.category in Category)) {
                this.setResponse(res, 'wrong category', 400);
            } else {
                JobPosting.addJobPosting(posting, (err, jobPosting) => {
                    if (err) {
                        this.logger.error(err.toString());
                        this.setResponse(res, 'something went wrong', 500);
                    } else {
                        this.logger.info('posting added');
                        this.setResponse(res, 'posting added succesfully');
                    }
                });
            }

        });
    }

    public getJobPostingsAction(router: Router): void {
        router.get('/postings', (req: Request, res: Response) => {
            JobPosting.find({}, (err, postings) => {
                if (!postings) {
                    postings = [];
                }

                res.send(postings);
            });
        });
    }

    public getJobPostingAction(router: Router): void {
        router.get('/postings/:id', (req: Request, res: Response) => {
            JobPosting.findById(req.params.id, (err, posting) => {
                if (!posting) {
                    this.setResponse(res, 'posting does not exist', 404);
                    return false;
                }

                res.send(posting);
            });
        });
    }

    private setResponse(res: Response, message: string, code: number = 200): void {
        if (code !== 200) {
            res.status(code);
        }
        res.json({
            success: code === 200,
            message: message
        });
    }
}
