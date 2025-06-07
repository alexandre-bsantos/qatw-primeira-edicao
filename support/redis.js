import { Queue } from "bullmq"

const connection = {
    host: 'paybank-redis',
    post: 6379
}

const queueName = 'twoFactorQueue'

const queue = new Queue(queueName, {connection})

export const cleanJobs = async () => {
    await queue.obliterate()
}

export const getJob = async () => {
    const jobs = await queue.getJobs()
    return jobs[0].data.code
}