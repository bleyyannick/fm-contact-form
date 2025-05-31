import { useState } from 'react'
import './App.css'
import { validateField } from './utils/validation'
import { type FormDataType } from './types'

function App() {


const initialFormState: FormDataType = {
  firstName: '',
  lastName: '',
  email: '',
  queryType: '',
  message: '',
  consent: false,
};

const initialDidEdit: Record<keyof FormDataType, boolean> = Object.keys(initialFormState).reduce(
  (acc, key) => ({ ...acc, [key]: false }),
  {} as Record<keyof FormDataType, boolean>
);

const [formData, setFormData] = useState<FormDataType>(initialFormState);
const [didEdit, setDidEdit] = useState(initialDidEdit);


const handleInput = (field: keyof FormDataType, value: string | boolean) => {
  setFormData(prev => ({ ...prev, [field]: value }));

  if (validateField(field, value)) {
    setDidEdit(prev => ({ ...prev, [field]: false }));
  }
};

const handleBlur = (field: keyof FormDataType) => {
  setDidEdit(prev => ({ ...prev, [field]: true }));
};


const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const newDidEdit: Record<keyof FormDataType, boolean> = { ...initialDidEdit };
  let isFormValid = true;

  for (const field in formData) {
    const key = field as keyof FormDataType;
    const isValid = validateField(key, formData[key]);
    newDidEdit[key] = !isValid;
    if (!isValid) isFormValid = false;
  }
  setDidEdit(newDidEdit);

  if (!isFormValid) return;

  setFormData(initialFormState);
  setDidEdit(initialDidEdit);
};

const handleFocus = (field: keyof FormDataType) => {
  setDidEdit(prev => ({ ...prev, [field]: false }));
};

const getErrorStyle = (field: keyof FormDataType) => {
  return didEdit[field] && !validateField(field, formData[field]) ? 'error' : '';
};


  return (
    <form onSubmit={handleSubmit} id="contactForm">
      <h1>Contact Us</h1>

      <div className="form-description">
        <div className="input-text">
          <label htmlFor="firstName">First Name:</label>
          <input 
            type="text" 
            id="firstName"
            className={getErrorStyle('firstName')}
            name="firstName"
            onChange={e => handleInput('firstName', e.target.value)}
            onBlur={() => handleBlur("firstName")}
            onFocus={() => setDidEdit(prev => ({ ...prev, firstName: false }))}
            value={formData.firstName}
          />
          <div className="error-message">
            {didEdit.firstName && formData.firstName.trim().length < 3 && (
              <span className="error">First name must be at least 3 characters.</span>
            )}
            {didEdit.firstName && formData.firstName && !/^[A-Za-zÀ-ÿ\s'-]+$/.test(formData.firstName) && (
              <span className="error">First name must contain only letters.</span>
            )}
          </div>
        </div>

        <div className="input-text">
          <label htmlFor="lastName">Last Name:</label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName"
            className={getErrorStyle('lastName')}
            onChange={e => handleInput('lastName', e.target.value)}
            onBlur={() => handleBlur('lastName')}
            onFocus={()=> handleFocus('lastName')}
            value={formData.lastName}
          />
          <div className="error-message">
            {didEdit.lastName && formData.lastName.trim().length < 3 && (
              <span className="error">Last name must be at least 3 characters.</span>
            )}
            {didEdit.lastName && formData.lastName && !/^[A-Za-zÀ-ÿ\s'-]+$/.test(formData.lastName) && (
              <span className="error">Last name must contain only letters.</span>
            )}
          </div>
        </div>

        <div className="input-text">
          <label htmlFor="email">Email Address:</label>
          <input 
            type="text" 
            id="email" 
            name="email"
            className={getErrorStyle('email')}
            onChange={e => handleInput('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            onFocus={() => handleFocus('email')}
            value={formData.email}
          />
          <div className="error-message">
            {didEdit.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
              <span className="error">Please enter a valid email address.</span>
            )}
          </div>
        </div>
      </div>

      <div className="form-options">
        <legend>Query Type:</legend>

        <div className={`input-radio ${getErrorStyle('queryType')}`}>
          <input 
            type="radio" 
            id="queryType1" 
            name="queryType"
            value="General Enquiry"
            onChange={e => handleInput("queryType", e.target.value)}
            onBlur={() => handleBlur('queryType')}
            checked={formData.queryType === "General Enquiry"}
          />
          <label htmlFor="queryType1">General Enquiry</label>
        </div>

        <div className={`input-radio ${getErrorStyle('queryType')}`}>
          <input 
            type="radio" 
            className={getErrorStyle('queryType')}
            id="queryType2" 
            name="queryType"
            value="Support Request"
            onChange={e => handleInput("queryType", e.target.value)}
            onBlur={() => handleBlur("queryType")}
            checked={formData.queryType === "Support Request"}
          />
          <label htmlFor="queryType2">Support Request</label>
        </div>

        {didEdit.queryType && !formData.queryType && (
          <div className="error-message">
            <span className="error">Please select a query type.</span>
          </div>
        )}
      </div>

      <div className="form-message">
        <label htmlFor="message">Message:</label>
        <textarea 
          id="message"
          className={getErrorStyle('message')} 
          name="message"  
          rows={4}
          onChange={e => handleInput('message', e.target.value)}
          onBlur={() => handleBlur('message')}
          onFocus={() => handleFocus('message')} 
          value={formData.message}
        ></textarea>
        <div className="error-message">
          {didEdit.message && formData.message.trim().length < 10 && (
            <span className="error">Message must be at least 10 characters.</span>
          )}
        </div>
      </div>

      <div className="form-consent">
        <input 
          type="checkbox" 
          id="consent"
          name="consent"
          className={getErrorStyle('consent')}
          onChange={e => handleInput("consent", e.target.checked)}
          onBlur={() => handleBlur("consent")}
          checked={formData.consent}
        />
        <label htmlFor="consent">I consent to being contacted by the team.</label>
        {didEdit.consent && !formData.consent && (
          <div className="error-message">
            <span className="error">You must consent to be contacted.</span>
          </div>
        )}
      </div>

      <button className="form-submit" type="submit">Submit</button>
    </form>
  );
}

export default App;
