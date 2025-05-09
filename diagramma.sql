CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    plate_number VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE parkings (
    id SERIAL PRIMARY KEY,
    location VARCHAR(50) NOT NULL,
    slot_number INTEGER NOT NULL,
    is_booked BOOLEAN NOT NULL DEFAULT FALSE,
    booked_by_id INTEGER NOT NULL,
    car_id INTEGER NOT NULL,
    booked_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booked_by_id) REFERENCES users(id),
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
);