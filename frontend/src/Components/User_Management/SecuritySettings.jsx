import React from 'react';
import { Link } from 'react-router-dom';
import'./SecuritySettings.css'
function SecuritySettings() {
    return (
        <div className="container-xl px-4 mt-4">
            {/* Account page navigation*/}
            <nav className="nav nav-borders">
            <button className="nav-link">
            <Link to="/AccountDetails">Profile</Link>
             </button>
                <button className="nav-link">Billing</button>
                <button className="nav-link">Security</button>
                <button className="nav-link">Notifications</button>
            </nav>
            <hr className="mt-0 mb-4" />
            <div className="row">
                <div className="col-lg-8">
                    {/* Change password card*/}
                    <div className="card mb-4">
                        <div className="card-header">Change Password</div>
                        <div className="card-body">
                            <form>
                                {/* Form Group (current password)*/}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="currentPassword">Current Password</label>
                                    <input className="form-control" id="currentPassword" type="password" placeholder="Enter current password" />
                                </div>
                                {/* Form Group (new password)*/}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="newPassword">New Password</label>
                                    <input className="form-control" id="newPassword" type="password" placeholder="Enter new password" />
                                </div>
                                {/* Form Group (confirm password)*/}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="confirmPassword">Confirm Password</label>
                                    <input className="form-control" id="confirmPassword" type="password" placeholder="Confirm new password" />
                                </div>
                                <button className="btn btn-primary" type="button">Save</button>
                            </form>
                        </div>
                    </div>
                    <hr className="my-4" />
                    {/* Data sharing options*/}
                    
                    
                </div>
            </div>
            {/* Delete account card */}
            <div className="card mb-4">
                <div className="card-header">Delete Account</div>
                <div className="card-body">
                    <p>Deleting your account is a permanent action and cannot be undone. If you are sure you want to delete your account, select the button below.</p>
                    <button className="btn btn-danger-soft text-danger" type="button">I understand, delete my account</button>
                </div>
            </div>
        </div>
    );
}

export default SecuritySettings;
