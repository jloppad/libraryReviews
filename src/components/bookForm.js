import DivInput from "../components/divInput";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/bookForm.css";

export default function BookForm({
    handleSubmit,
    handleChange,
    handleOnChangeFile,
    title,
    author,
    intro,
    review,
    completed,
    coverPreview,
    image1Preview,
    image2Preview,
    isEdit = false,
    bookId = null
}) {
    const [cover, setCover] = useState(false);
    const [image1, setImage1] = useState(false);

    const handleFileWithControl = (event) => {
        const { name } = event.target;
        if (name === "cover") setCover(true);
        if (name === "image1") setImage1(true);
        handleOnChangeFile(event);
    };

    useEffect(() => {
        if (coverPreview) setCover(true);
        if (image1Preview) setImage1(true);
    }, [coverPreview, image1Preview]);

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <DivInput props={{ classContainer: "input-container", classTitle: "input-title", title: "Title", type: "text", name: "title", onChange: handleChange, value: title, classInput: "input-field", placeholderText: "Write the title..." }} />
            <DivInput props={{ classContainer: "input-container", classTitle: "input-title", title: "Author", type: "text", name: "author", onChange: handleChange, value: author, classInput: "input-field", placeholderText: "Write the author..." }} />

            <div className="input-container">
                <div className="input-title">Cover</div>
                <label className="custom-file-label">
                    Choose cover
                    <input type="file" name="cover" onChange={handleFileWithControl} />
                </label>
                {coverPreview && <img src={coverPreview} className="preview-image" alt="Cover preview" />}
            </div>

            <div className="input-container">
                <div className="input-title">More Images</div>
                <label className={`custom-file-label ${!cover ? "label-disabled" : ""}`}>
                    Choose image 1
                    <input
                        type="file"
                        name="image1"
                        onChange={handleFileWithControl}
                        disabled={!cover}
                    />
                </label>
                {image1Preview && <img src={image1Preview} width="200" alt="1 preview" />}
                <label className={`custom-file-label ${!image1 ? "label-disabled" : ""}`}>
                    Choose image 2
                    <input
                        type="file"
                        name="image2"
                        onChange={handleFileWithControl}
                        disabled={!image1}
                    />
                </label>
                {image2Preview && <img src={image2Preview} width="200" alt="2 preview" />}
            </div>

            <div className="input-container">
                <label className="input-title">Introduction</label>
                <textarea
                    name="intro"
                    value={intro}
                    onChange={handleChange}
                    className="input-field textarea intro"
                    placeholder="Write an introduction..."
                    rows="4"
                />
            </div>

            <div className="input-title">
                Completed
                <div className="checkbox-container">
                    <input type="checkbox" name="completed" onChange={handleChange} checked={completed} />
                </div>
            </div>

            <div className="input-container">
                <label className="input-title">Review</label>
                <textarea
                    name="review"
                    value={review}
                    onChange={handleChange}
                    className="input-field textarea review"
                    placeholder="Write your review..."
                    rows="6"
                />
            </div>

            <div className="button-container">
                <button type="submit" className="submit-button">
                    {isEdit ? "Modify book" : "Register book"}
                </button>
                {isEdit && bookId && (
                    <Link to={`/view/${bookId}`} className="link-btn">
                        Return to Review
                    </Link>
                )}
            </div>
        </form>
    );
}
