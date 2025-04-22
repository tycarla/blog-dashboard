exports.lambdaHandler = async (event) => {
    const { httpMethod, path, pathParameters, body } = event;

    // Simulate blog storage (for now)
    let blogs = [
        { id: "1", title: "First Blog", content: "This is the first blog." },
        { id: "2", title: "Second Blog", content: "Another blog post." }
    ];

    if (httpMethod === 'GET' && path === '/blogs') {
        return {
            statusCode: 200,
            body: JSON.stringify(blogs),
        };
    }

    if (httpMethod === 'GET' && pathParameters?.id) {
        const blog = blogs.find(b => b.id === pathParameters.id);
        return {
            statusCode: 200,
            body: JSON.stringify(blog || {}),
        };
    }

    if (httpMethod === 'POST' && path === '/blogs') {
        const newBlog = JSON.parse(body);
        newBlog.id = String(Date.now());
        blogs.push(newBlog);
        return {
            statusCode: 201,
            body: JSON.stringify(newBlog),
        };
    }

    if (httpMethod === 'PUT' && pathParameters?.id) {
        const index = blogs.findIndex(b => b.id === pathParameters.id);
        if (index !== -1) {
            const updated = JSON.parse(body);
            blogs[index] = { ...blogs[index], ...updated };
            return {
                statusCode: 200,
                body: JSON.stringify(blogs[index]),
            };
        }
    }

    if (httpMethod === 'DELETE' && pathParameters?.id) {
        blogs = blogs.filter(b => b.id !== pathParameters.id);
        return {
            statusCode: 200,
            body: JSON.stringify({ deleted: true }),
        };
    }

    return {
        statusCode: 404,
        body: JSON.stringify({ message: "Not Found" }),
    };
};