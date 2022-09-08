Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
        origins 'http://127.0.0.1:5500', 'localhost:5500', 'http://127.0.0.1:3001', 'localhost:3001' 

        resource(
            '/api/*', 
            headers: :any, 
            credentials: true, 
            methods: [:get, :post, :patch, :put, :delete, :options] 
        ) 
    end
end