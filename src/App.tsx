import './App.css'

function App() {

  return (
    <>
      <form id="contactForm">
        <h1>Contact Us</h1>
        <div className="form-description">
          <div className="input-text">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" required />
          </div>
          <div className="input-text">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" required />
          </div>
          <div className="input-text">
            <label htmlFor="email">Email Address:</label>
            <input type="text" id="email" name="email" required />
          </div>
        </div>
      
        <div className="form-options">
          <legend>Query Type:</legend>
          <div className="input-radio">
            <input type="radio" id="queryType" name="queryType" value="General Enquiry" required />
            <label htmlFor="queryType1">General Enquiry</label>
          </div>
          <div className="input-radio">
            <input type="radio" id="queryType" name="queryType" value="Support Request" required />
            <label htmlFor="queryType2">Support Request</label>
          </div>
        </div>

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message"  rows={4} required></textarea>

        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default App
