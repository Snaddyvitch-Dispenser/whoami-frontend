import styles from "../Styles/LoginView.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudQuestion} from "@fortawesome/pro-solid-svg-icons";
import React, {SyntheticEvent} from "react";
import {AccountTemp, Shares} from "../ViewController/AccountRecoveryViewController";

export default function AccountRecoveryViewModel(props: {account: AccountTemp | null, password: string, passwordConfirm: string, username: string, shares: Shares[],
    finalPassword: string, setFinalPassword: (p: string) => void, applyNewCredentials: (e: SyntheticEvent) => void,
    setPassword: (v: string) => void, setPasswordConfirm: (v: string) => void, recoveryId: string, setUsername: (v: string) => void, error: string, onSubmitClick: (e: SyntheticEvent) => void}) {


    return <div className={styles.login_container}>
        <div className={styles.login_form_head}>
            <FontAwesomeIcon icon={faCloudQuestion}/>
            <h1 className={styles.login_form_head_text}>WhoAmI</h1>
        </div>
        <div className={styles.login_form}>

            <p>Recover My Account</p>
            <form>
                {props.error ? <p style={{color: "red"}}>{props.error}</p> : null}
                {props.account === null ? <><div className={styles.login_form_input_container}>
                    <label htmlFor="text">Username</label>
                    <input type="text" id="text" name="username" placeholder="" value={props.username} onChange={e => props.setUsername(e.target.value)}/>
                </div>
                <div className={styles.login_form_input_container}>
                    <label htmlFor="password">New Password</label>
                    <input type="password" id="password" name="password" value={props.password} onChange={e => props.setPassword(e.target.value)} />
                </div>
                <div className={styles.login_form_input_container}>
                    <label htmlFor="passwordtwo">Confirm New Password</label>
                    <input type="password" id="passwordtwo" name="password" value={props.passwordConfirm} onChange={e => props.setPasswordConfirm(e.target.value)} />
                </div>
                    <button onClick={props.onSubmitClick} className={styles.login_form_button}>Begin Recovery</button></> : <div>
                    <p>Account Recovery ID: {props.recoveryId}. Please tell at least 2 trusted parties this ID and have them approve it to regain account access.</p>
                </div>}

                <h3>Status</h3>
                <p><strong>{props.shares.length} Shares Submitted (2 Required)</strong></p>
                {props.shares.length >= 2 ? <>
                {/* Need password to finish encryption */}
                    <label htmlFor="password">Confirm New Password</label>
                    <input type="password" id="password" name="password" value={props.finalPassword} onChange={e => props.setFinalPassword(e.target.value)} />
                    <button onClick={props.applyNewCredentials}>Apply New Credentials</button>
                </> : <p>Please wait for more shares to be submitted.</p>}
            </form>
        </div>
    </div>;
}