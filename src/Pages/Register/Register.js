import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const validationErrors = {};
    if (!email.includes("@")) {
      validationErrors.email = "Please enter a valid email address.";
    }
    if (password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters.";
    }
    if (!firstName) {
      validationErrors.firstName = "First name is required.";
    }
    if (!lastName) {
      validationErrors.lastName = "Last name is required.";
    }
    if (!department) {
      validationErrors.department = "Department is required.";
    }
    if (!graduationYear || graduationYear < 2020 || graduationYear > 2100) {
      validationErrors.graduationYear = "Enter a valid graduation year.";
    }
    return validationErrors;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Submit data (mocked)
      console.log({
        email,
        password,
        firstName,
        middleName,
        lastName,
        department,
        graduationYear,
        bio,
      });
      alert("Registration successful!");
    }
  };

  return (
    <div className="register-container">
      <h2>Create Your Account</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your UMass email"
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>
        </div>

        <div className="form-group">
          <div className="field">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
            />
            {errors.firstName && (
              <div className="error-message">{errors.firstName}</div>
            )}
          </div>
          <div className="field">
            <label>Middle Name</label>
            <input
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              placeholder="Middle name (optional)"
            />
          </div>
          <div className="field">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
            />
            {errors.lastName && (
              <div className="error-message">{errors.lastName}</div>
            )}
          </div>
        </div>

        <div className="form-group">
          <div className="field">
            <label>Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Department"
            />
            {errors.department && (
              <div className="error-message">{errors.department}</div>
            )}
          </div>
          <div className="field">
            <label>Graduation Year</label>
            <input
              type="number"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              placeholder="Graduation year"
            />
            {errors.graduationYear && (
              <div className="error-message">{errors.graduationYear}</div>
            )}
          </div>
        </div>

        <div className="field">
          <label>Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us something about yourself"
          ></textarea>
        </div>

        <button type="submit" className="btn-register">
          Register
        </button>
      </form>
      <p>
        Already have an account? <a href="/">Sign in here!</a>
      </p>
    </div>
  );
};

export default Register;
