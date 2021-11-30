export const mappingPost = (postData: any) => {
    return {
        _id: postData._id,
        title: postData.title,
        description: postData.description,
        createdAt: postData.createdAt
            ? new Date(postData.createdAt).toDateString()
            : "",
        updatedAt: postData.updatedAt
            ? new Date(postData.updatedAt).toDateString()
            : "",
        jobType: postData.jobType,
        impressions: postData.impressions,
        expiredDate: postData.expiredDate
            ? new Date(postData.expiredDate).toDateString()
            : "",
        isClosed: postData.isClosed,
        benefits: postData.benefits,
        requirement: postData.requirement,
        responsibilities: postData.responsibilities,
        experience: postData.experience,
        industries: postData.industries,
        skills: postData.skills,
        tags: postData.tags,
        salaryType: postData.salaryType,
        minSalary: postData.minSalary,
        maxSalary: postData.maxSalary,
        location: postData.location,
    };
};
